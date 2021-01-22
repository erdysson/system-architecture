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
                        sh('''./scripts/build.sh''')
                    }
                }
           }
        }

        stage('Build Frontend') {
            steps {
                dir ('app-frontend') {
                    script {
                        sh('''./scripts/build.sh''')
                    }
                }
            }
        }

        stage('Initiate Environment') {

            steps {
                dir ('app') {
                    script {
                        sh('''./scripts/start.sh''')
                    }
                }

                dir ('app-frontend') {
                    script {
                        sh('''./scripts/start.sh''')
                    }
                }
            }
        }
    }
}
