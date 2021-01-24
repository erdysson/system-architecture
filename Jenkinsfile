pipeline {
    agent any

    environment {
        HOME = '.'
    }

    stages {

        stage('Test') {

            agent {
                docker {
                    image 'cypress/base:12'
                    args '-v /Library/Caches/Cypress'
                }
            }

            steps {
                dir('app-test') {
                    script {
                        sh '''
                            CYPRESS_CACHE_FOLDER=/Library/Caches/Cypress
                             npm install
                            CYPRESS_RUN_BINARY=/Library/Caches/Cypress/6.3.0/Cypress.app/Contents/MacOS/Cypress
                             ./node_modules/.bin/cypress run
                        '''
                    }
                }
            }
        }

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
