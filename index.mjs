import AWS from 'aws-sdk';

export const handler = async (event, context) => {
  const sns = new AWS.SNS();

  const message = {
    data:"sample message from sendMessageSNS"
  };

  const params = {
    Message: JSON.stringify(message),
    TopicArn: 'arn:aws:sns:ap-south-1:777175687872:firstMessageTopic'
  };

  try {
    const result = await sns.publish(params).promise();
    console.log('SNS message published:', result.MessageId);
  } catch (error) {
    console.error('Error publishing SNS message:', error);
  }
};