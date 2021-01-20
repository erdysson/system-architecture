pipeline {
    agent any

    {
        environment {
            HOME = '.'
        }
    }

    stages {
        stage('Build Backend') {
            agent {
                dockerfile {
                    dir 'app'
                }
            }
        }
    }
}
