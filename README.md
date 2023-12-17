# Create VPC with 4 subnets (2 public, 2 private), 2 route tables, 1 igw, 1 nat:

1. For first AZ (eu-west-3a)
   1.1) dvij-api-public-subnet-3a
   1.2) dvij-db-private-subnet-3a
2. For second AZ (eu-west-3b)
   2.1) dvij-api-public-subnet-3b
   2.2) dvij-db-private-subnet-3b

then 2 route tables:

3. For public api subnets
4. for private db subnets

then

5. igw (assign public api route table) // for internet access.
6. nat (assign private db route table) // to connect from ec2 to rds

Sources:

- https://www.youtube.com/watch?v=60WzsSE2-yQ
- https://www.youtube.com/watch?v=sCBTeMd0Jj4

# Connection from EC2 Amazon Linux to RDS Postgresql instance

On ec2 we have a Amazon Linux OS. To install psql on it use:
`sudo yum install postgresql12`
Troubleshooting:

if "No package postgresql12 available." then:

```
amazon-linux-extras list | grep postgresql
sudo amazon-linux-extras enable postgresql12
sudo yum clean metadata
sudo yum install postgresql
psql --version // now should be 12
```

test connection: telnet [rds-endpoint] [db-port]
`psql -h [rds-endpoint] -U [username] -d [database-name]`
psql -h dvij-db.cy2xamx7hsww.eu-west-3.rds.amazonaws.com -U postgres -d postgres

# To connect to git from ec2 via SSH:

ssh-keygen // generate ssh keys(public&private)
cat ~/.ssh/id_rsa.pub // copy and paste to git (Settings->SSH..)
sudo yum install git -y
git clone [repoUrl]

# Install NodeJS and NPM using nvm

Sources: https://medium.com/@rajani103/deploying-nodejs-app-on-aws-ec2-instance-step-by-step-1b00f807cdce

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
cd ~/.nvm
chmod +x nvm.sh
source ~/.nvm/nvm.sh
echo "source ~/.nvm/nvm.sh" >> ~/.bashrc
nvm install 20.10.0
```
