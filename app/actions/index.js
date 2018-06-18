import * as types from './types';
import { fetchJSON } from './apiUtils';
import * as loginActions from './login';
import * as transactionsActions from './transactions';
import * as walletActions from './wallet';
import * as blockChainActions from './blockchain';
import * as messageActions from './message';

// =================== LOGIN ACTIONS ====================
export const login = loginActions.login 
export const logout = loginActions.logout

// =================== TRANSACTION ACTIONS ==============
export const buyKoin = transactionsActions.buyKoin

// =================== WALLET ACTIONS ===================
export const depositToWallet = walletActions.depositToWallet 
export const updateWallet = walletActions.updateWallet

// =================== PURCHASE TRIGGER ACTIONS ===================
export const createPurchaseTrigger = transactionsActions.createPurchaseTrigger

// =================== BLOCKCHAIN TRANSACTION ACTIONS ===================
export const getAllTransactions = blockChainActions.getAllTransactions;
export const getMyTransactions = blockChainActions.getMyTransactions;

// =================== BLOCKCHAIN TRANSACTION ACTIONS ===================
export const closeMessage = messageActions.closeMessage;