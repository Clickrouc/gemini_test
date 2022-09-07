import mongoose from 'mongoose';
import { IProxyDoc, IProxyModel } from '@/modules/proxy/proxy.interfaces';
import { toJSON } from '../toJSON';
import { paginate } from '../paginate';

const proxySchema = new mongoose.Schema<IProxyDoc, IProxyModel>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

proxySchema.plugin(toJSON);
proxySchema.plugin(paginate);

const Proxy = mongoose.model<IProxyDoc, IProxyModel>('Proxy', proxySchema);

export default Proxy;
