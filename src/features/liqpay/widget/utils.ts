import { Base64 } from 'js-base64';

const public_key = 'sandbox_i98242916389';
const private_key = 'sandbox_F8ckxc9PE7edrnUg6BElQAv2hoUdbhWMm4o9jLBl';
import { sha1 } from './sha1';

interface LiqPayParams {
  currency: string;
  version: number;
  public_key: string;
  private_key: string;
  action: string;
  amount: number;
  description: string;
  order_id: string;
  mode: 'embed' | 'popup';
}

export const checkoutPay = (value: number, balanceId: number) => {
  const json: LiqPayParams = {
    currency: 'USD',
    version: 3,
    public_key: public_key,
    private_key: private_key,
    action: 'pay',
    amount: 1,
    description: `Replenishment of account balance.`,
    order_id: `Order qwe`,
    mode: 'popup',
  };
  const encodedData = Base64.encode(JSON.stringify(json));
  const sign_string = private_key + encodedData + private_key;
  const encodedSign = Base64.encode(sha1(sign_string));

  return {
    data: encodedData,
    sign: encodedSign,
  };
};
