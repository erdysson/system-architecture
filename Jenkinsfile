pipeline {
    agent any

    environment {
        HOME = '.'
        CHROME_BIN = '/bin/google-chrome'
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

                dir ('nginx') {
                    script {
                        sh('''./scripts/start.sh''')
                    }
                }
            }
        }

        stage('Test') {

            agent {
                docker {
                    image 'node:12.7-alpine'
                }
            }

            steps {

                dir('app-test') {

                    script {
                        sh('''./scripts/run.sh''')
                    }
                }
            }
        }
    }

    post {
        always {
            dir ('app') {
                script {
                    sh('''./scripts/stop.sh''')
                    sh('''./scripts/remove.sh''')
                }
            }

            dir ('app-frontend') {
                script {
                    sh('''./scripts/stop.sh''')
                    sh('''./scripts/remove.sh''')
                }
            }

            dir ('nginx') {
                script {
                    sh('''./scripts/stop.sh''')
                    sh('''./scripts/remove.sh''')
                }
            }
        }
    }
}
