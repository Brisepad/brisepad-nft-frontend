import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { BscConnector } from '@binance-chain/bsc-connector';
import Web3 from 'web3';
import { ConnectorNames } from '../components/wallet/config';
import getNodeUrl, { bitkeepLocalhost } from './getRpcUrl';


const POLLING_INTERVAL = 12000;
const rpcUrl = getNodeUrl();
const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10);

export const injected = new InjectedConnector({ supportedChainIds: [chainId] });

const walletconnect = new WalletConnectConnector({
    rpc: { [chainId]: rpcUrl },
    // bridge: 'https://pancakeswap.bridge.walletconnect.org/',
    qrcode: true,
    pollingInterval: POLLING_INTERVAL,
})
  
const bscConnector = new BscConnector({ supportedChainIds: [chainId] })

export const connectorsByName = {
    [ConnectorNames.Injected]: injected,
    [ConnectorNames.WalletConnect]: walletconnect,
    [ConnectorNames.BSC]: bscConnector,
}
  
export const getLibrary = (provider) => {
    // Change Bitkeep wallet RPC url
  if(
        provider
        &&
        provider.rpc
        && 
        window?.bitkeep
        &&
        window?.bitkeep?.ethereum?.isBitKeep
        &&
        window?.bitkeep
        &&
        window.bitkeep?.ethereum?.isBitEthereum
    ){
      if(provider.rpc.rpcUrl === bitkeepLocalhost){
        provider.rpc.rpcUrl = rpcUrl;
      }
      
    }
    return new Web3(provider);
}
  