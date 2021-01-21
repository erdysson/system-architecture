pipeline {
    agent any

    environment {
        HOME = '.'
    }

    stages {

        stage('Build Backend') {
            steps {
                dir('app') {
                    script {
                        sh('build.sh')
                    }
                }
           }
        }

        stage('Build Frontend') {
            steps {
                dir ('app-frontend') {
                    script {
                        sh('build.sh')
                    }
                }
            }
        }
    }
}
