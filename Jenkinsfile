def TIMESTAMP = Calendar.getInstance().getTime().format('YYYYMMdd-hhmm')

pipeline {

  agent none

  options {
    disableConcurrentBuilds()
    parallelsAlwaysFailFast()
  }

  environment {
    ANDROID_HOME = '/home/ubuntu/android-sdk'
    S3repo = 's3://gbh-mobile/demo-project'
    S3url = 'https://gbh-mobile.s3-us-west-2.amazonaws.com/demo-project'
    apiPath = "/srv/movies-mobile-app"
    officeWebhookUrl = "https://outlook.office.com/webhook/fd2e0e97-97df-4057-a9df-ff2e0c66196a@64aa16ab-5980-47d5-a944-3f8cc9bbdfa2/IncomingWebhook/6c2ab55478d146efbe4041db69f97108/217bfa4b-9515-4221-b5b7-6858ebd6d4b5"
  }

  stages {
    stage("Environment") {
      agent {
        label 'mobile'
      }
      steps {
        script {
          jiraId = getTicketIdFromBranchName("${GIT_BRANCH}");
          sh(
            label: "Setting android environment",
            script: """
              cd ${apiPath}
              git checkout .
              git fetch
              git pull origin ${GIT_BRANCH}
            """
          )
        }
      }
      post {
        success {
          office365ConnectorSend color: "05b222", message: "CI pipeline for ${GIT_BRANCH} initialized. ReviewApp will be available at: https://kanon.gbhlabs.net/.", status: "STARTED", webhookUrl: "${officeWebhookUrl}"
        }
      }
    }

    stage("Initialize") {
      agent {
        label 'mobile'
      }
      steps {
        echo "This step will build the app."
        sh(
          label: "Setting android environment",
          script: """
            cd ${apiPath}
            npm i
            cd android
            ./gradlew assembleRelease
            cd ${ANDROID_REPO}/android/app/build/outputs/apk/staging/release
            mv *.apk ${TIMESTAMP}.apk
          """
        )
        sh(
          label: "Uploading to S3",
          script: """
            cd ${ANDROID_REPO}/android/app/build/outputs/apk/staging/release
            aws s3 cp ${TIMESTAMP}.apk ${S3_REPO}/android/${TIMESTAMP}.apk --acl public-read
          """
        )
      }
    }

    stage("Validation") {
      agent {
        label 'mobile'
      }
      steps {
        sh(
          label: "Posting ReviewApp data to Kanon...",
          script: """
            curl \
              -H "Content-Type: application/json" \
              -H "authToken: as5uNvV5bKAa4Bzg24Bc" \
              -d '{"branch": "${GIT_BRANCH}", "apiURL": "https://api.themoviedb.org/3", "jiraIssueKey": "${jiraId}", "build": "${BUILD_NUMBER}", "androidAppLink": "${S3_URL}/android/${TIMESTAMP}.apk"}' \
              -X POST \
              https://kanon-api.gbhlabs.net/api/reviewapps
          """
        )

        prettyPrint("ReviewApp URL: http://${hostPublic}")
        echo getTaskLink(GIT_BRANCH)
        input message: "Validation finished?"
      }
    }
  }
  post {
    failure {
      office365ConnectorSend color: "f40909", message: "CI pipeline for ${GIT_BRANCH} failed. Please check the logs for more information.", status: "FAILED", webhookUrl: "${officeWebhookUrl}"
    }
    success {
      office365ConnectorSend color:"50bddf", message: "CI pipeline for ${GIT_BRANCH} completed succesfully.", status:"SUCCESS", webhookUrl:"${officeWebhookUrl}"
    }
    always {
      sh(
        label: "Posting ReviewApp status to Kanon...",
        script: """
          curl \
            -H "Content-Type: application/json" \
            -H "authToken: as5uNvV5bKAa4Bzg24Bc" \
            -X POST \
            https://kanon-api.gbhlabs.net/api/reviewapps/deactivation?build=${BUILD_NUMBER}\\&branch=${GIT_BRANCH}
        """
      )
    }
  }
}

/*
 * Gets the public DNS name of the provisioned instance used to run this pipeline.
 * https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-instance-addressing.html
 */
def getHostName() {
  metadataUrl = "http://169.254.169.254/latest/meta-data/public-hostname"

  return sh(
    label: "Fetching host URL...",
    script: "curl ${metadataUrl}",
    returnStdout: true
  ).trim()
}
/*
 * Obtains the matching branch of another repository. This is used to fetch
 * a change that requires multiple repositories to be properly tested in
 * the continuous integration pipeline.
 */
def getBranchForRepo(String repo, String branchToCheck, String defaultBranch) {
  exists = sh(
    label: "Checking if ${branchToCheck} exists on ${repo}.",
    script: "git ls-remote --heads --exit-code ${repo} ${branchToCheck}.",
    returnStatus: true
  ) == 0

  if (exists) {
    return branchToCheck
  }

  if (defaultBranch == "master") {
    return "master"
  }

  return defaultBranch
}

/*
 * Get the ticket ID using the branch name.
 */
def getTicketIdFromBranchName(String branchName) {
  return branchName.findAll(/(DP-[0-9]+)/)[0];
}