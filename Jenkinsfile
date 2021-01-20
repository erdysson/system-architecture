pipeline {
    agent any

    environment {
        HOME = '.'
    }

    stages {
        stage('Build Backend') {
            dir ('/app') {
                  sh 'docker build -t nest_app .'
                  sh 'docker run nest_app -p 3000:3000'
               }
        }
    }
}
