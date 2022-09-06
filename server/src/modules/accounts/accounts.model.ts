import mongoose from 'mongoose';
import { ICookieDoc, ICookieModel, IAccountDoc, IAccountModel } from '@/modules/accounts/accounts.interfaces';
import { toJSON } from '../toJSON';
import { paginate } from '../paginate';

const cookiesSchema = new mongoose.Schema<ICookieDoc, ICookieModel>({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  path: {
    type: String,
  },
  expires: {
    type: String,
  },
  secure: {
    type: Boolean,
  },
});

const accountsSchema = new mongoose.Schema<IAccountDoc, IAccountModel>({
  disabled: {
    type: Boolean,
  },
  password: {
    type: String,
    required: true,
  },
  proxies: {
    type: [String],
  },
  cookies: {
    type: mongoose.Schema.Types.Map,
    of: [cookiesSchema],
  },
  userAgent: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
});

accountsSchema.plugin(toJSON);
accountsSchema.plugin(paginate);

const Account = mongoose.model<IAccountDoc, IAccountModel>('Account', accountsSchema);

export default Account;
