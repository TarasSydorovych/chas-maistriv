import { v4 as uuidv4 } from 'uuid';
import sha1 from 'sha1'
const generateSignature = ({finishPrice, uid}) => {
    const publicKey = 'sandbox_i47427856209';
    const privateKey = 'sandbox_nLRix8HatIf5clJkORUvGIFrNFCgRbbjOZQnneIK';

    const params = {"public_key": publicKey,"version":"3","action":"pay","amount":finishPrice,"currency":"UAH","description":"test","order_id":uid}

    const data = Buffer.from(JSON.stringify(params)).toString('base64');
    const fi = privateKey + data + privateKey;
    const signString = privateKey + data + privateKey;
    const hash = sha1(signString);
    const signature = Buffer.from(hash, 'hex').toString('base64');

    
    return { data, signature };
  };
  export default generateSignature;