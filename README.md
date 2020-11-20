# DynamoDB Recovery Test Run

This project is to resolve the following questions/tasks:

[ ] Restore a Table from S3 in a parquet data format

[ ] Table DynoamoDB Backups, can these be automagicaly streamed to other accounts within an aws org without undue pain?

[ ] Can a table that is defined within a cloudformation be restored and ingested into a happy CloudFormation Stack? If so What changes are need to allow us to do this?

[ ] Can the default aws SSO admin role have the delete table action permission removed easily without cuasing hassle?


These questions/tasks need to be resolved before giving the go ahead for a pile of effort to be put in loading up production with sensitive data for [meetBel](meetbel.com). We have a impending release deadline an these questions are currenly a blocker. 

Build and lint:
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
