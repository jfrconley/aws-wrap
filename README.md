# aws-wrap
Override aws-sdk config options for any node cli app that uses aws-sdk

## Usage

Here's an example with claudia
**awsconfigoptions.json**
```json
{
  "sslEnabled": false,
  "lambda": {
    "endpoint": "http://localhost:4574"
  }
}
```
**run**
```bash
aws-wrap awsconfigoptions.json claudia create --name some-lambda --api-module appserver --region us-east-1
```