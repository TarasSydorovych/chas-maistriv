
import TelegramLoginButton from 'react-telegram-login';
// AuthTH
const BOT_USERNAME = 'chasTest_bot'; // place username of your bot here

const AuthTH = () => {
    const handleTelegramResponse = response => {
        console.log(response);
      };
    
      return (
        <TelegramLoginButton dataOnauth={handleTelegramResponse} botName="chasTest_bot" />
      );
};

export default AuthTH;