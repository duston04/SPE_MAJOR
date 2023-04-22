pipeline {

	agent any

	environment {
	    registry = "darshan4163264/spebackend"
	    registryCredential = 'dockerId'
	    dockerImage = ''
	}

    stages {
        stage('Git Pull') {
            steps {
				git url: 'https://github.com/duston04/SPE_MAJOR.git',
				branch: 'master'
            }
        }
        stage('Maven Build') {
            steps {
                sh 'mvn clean install'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build registry
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script{
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Deploy Image Ansible'){
            steps {
                ansiblePlaybook becomeUser: null, colorized: true, disableHostKeyChecking: true, installation: 'Ansible', inventory: 'inventory', playbook: 'pb.yml', sudoUser: null
            }
        }

    }
}