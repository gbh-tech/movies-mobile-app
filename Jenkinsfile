def timeStamp = Calendar.getInstance().getTime().format('YYYYMMdd-hhmm')

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
    iOSPath = '/Users/gbh/Documents/movies-mobile-app'
    plist = "${timeStamp}.plist"
    version = "2."
  }

  stages {
    stage("Environment") {
      agent {
        label 'mobile'
      }
      steps {
        script {
          jiraId = getTicketIdFromBranchName("${env.CHANGE_BRANCH}");
          sh(
            label: "Setting android environment",
            script: """
              cd ${apiPath}
              git checkout .
              git fetch
              git pull origin ${env.CHANGE_BRANCH}
            """
          )
        }
      }
      post {
        success {
          office365ConnectorSend color: "05b222", message: "CI pipeline for ${env.CHANGE_BRANCH} initialized. ReviewApp will be available at: https://kanon.gbhlabs.net/.", status: "STARTED", webhookUrl: "${officeWebhookUrl}"
        }
      }
    }
    stage ('mobile-build') {
      parallel {
        stage("Android-build") {
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
                cd ${apiPath}/android/app/build/outputs/apk/release
                mv *.apk ${timeStamp}.apk
              """
            )
            sh(
              label: "Uploading to S3",
              script: """
                cd ${apiPath}/android/app/build/outputs/apk/release
                aws s3 cp ${timeStamp}.apk ${S3repo}/android/${timeStamp}.apk --acl public-read
                sudo rm *.apk
              """
            )
          }
        }
        stage("iOS-build") {
          agent {
            label 'iOS'
          }
          steps {
            script {
              revision = sh(
                script: "/usr/libexec/PlistBuddy -c 'Print CFBundleversion' '${APP_PATH}/Info.plist'",
                returnStdout: true
              ).trim()
            }
            sh(
              label: "Setting up iOS environment",
              script: """
                cd ${iOSPath}
                git checkout .
                git fetch
                git checkout ${env.CHANGE_BRANCH}
                git pull origin ${env.CHANGE_BRANCH}
                yarn install
                cd ${iOSPath}/ios
                pod install
              """
            )
            sh(
              label: "Building iOS IPA",
              script: """
                cd ${iOSPath}/ios
                fastlane pipeline
                cp Amadita*.ipa ${revision}-${timeStamp}.ipa
                cat app-ipa-template.plist.template | sed -e \"s/timeStamp/${timeStamp}/\" -e \"s/revision/${revision}/\" > ${plist}
                cat index.html | sed -e \"s/ITUNES_LINK/${plist}/\" > index.${timeStamp}.html
              """
            )
            sh(
              label: "Uploading to S3",
              script: """
                cd ${iOSPath}/ios
                aws s3 cp ${revision}-${timeStamp}.ipa ${S3repo}/ios/${revision}-${timeStamp}.ipa --acl public-read
                aws s3 cp index.${timeStamp}.html ${S3repo}/ios/index.${timeStamp}.html --acl public-read
                aws s3 cp ${timeStamp}.plist ${S3repo}/ios/${timeStamp}.plist --acl public-read
              """
            )
          }
        }
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
              -d '{"branch": "${env.CHANGE_BRANCH}", "apiURL": "https://api.themoviedb.org/3", "jiraIssueKey": "${jiraId}", "build": "${BUILD_NUMBER}", "androidAppLink": "${S3url}/android/${timeStamp}.apk", "iosAppLink": "${S3url}/ios/index.${TIMESTAMP}.html"}' \
              -X POST \
              https://kanon-api.gbhlabs.net/api/reviewapps
            curl \
              -H "Content-Type: application/json" \
              -H "authToken: as5uNvV5bKAa4Bzg24Bc" \
              -X POST \
              https://kanon-api.gbhlabs.net/api/reviewapps/deactivation?build=${BUILD_NUMBER}\\&branch=${env.CHANGE_BRANCH}
          """
        )
      }
    }
  }
  post {
    failure {
      office365ConnectorSend color: "f40909", message: "CI pipeline for ${env.CHANGE_BRANCH} failed. Please check the logs for more information.", status: "FAILED", webhookUrl: "${officeWebhookUrl}"
    }
    success {
      office365ConnectorSend color:"50bddf", message: "CI pipeline for ${env.CHANGE_BRANCH} completed succesfully.", status:"SUCCESS", webhookUrl:"${officeWebhookUrl}"
    }
  }
}

def getTicketIdFromBranchName(String branchName) {
  return branchName.findAll(/(DP-[0-9]+)/)[0];
}