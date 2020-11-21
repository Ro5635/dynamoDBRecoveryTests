# DynamoDB Recovery Test Run

This project is to resolve the following questions/tasks:

[ ] Restore a Table from S3 in a parquet data format

[/] Table DynoamoDB Backups, can these be automagicaly streamed to other accounts within an aws org without undue pain? {AWS Backup Service ❤️}

[/] Can a table that is defined within a CloudFormation be restored and ingested into a happy CloudFormation Stack? If so What changes are need to allow us to do this?

[ ] Can the default aws SSO admin role have the delete table action permission removed easily without causing hassle?


These questions/tasks need to be resolved before giving the go ahead for a pile of effort to be put in loading up production with sensitive data for [meetBel](https://meetbel.com). We have a impending release deadline an these questions are currently a blocker.

## Project Contains

Cake HTTP API allows the caller to get cakes, cakes are stored in DynamoDB under the `Cake` partition key, simple JS lambda to scoop this out. This is 
an absolute minimal application that I am using to dry-run restoring a DynamoDB table for a running application. 

So far I have switched out the table to a recovered version of the table and imported that new DynamoDB table into this stack and maintained a `in-sync`
DynamoDB stack state.

I would like to at some point restore the state of the dynamoDB from a parquet dump in S3, we already have a data pipeline that persists the table in 
the Parquet format for our "data science" requirements, so if this can also be used for restore purposes that would be great. 

I have also set up the aws Backup Service with this table and restored from a back up in the vault. 

This does resolve the questions I had before giving the go ahead for production data to be populated. 🤔



Build and lint (in service directory):
```
npm run build
```

Package:
```
aws cloudformation package --s3-bucket your-cf-bucket  --output-template-file packaged.yaml
```

Deploy:
```
 aws cloudformation --template-file /FULL/PATH/TO/packaged.yaml --stack-name YOUR_STACK_NAME --region eu-west-1 --capabilities CAPABILITY_IAM
```
