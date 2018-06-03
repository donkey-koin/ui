import * as types from './types';
import { fetchJSON } from './apiUtils';
import * as loginActions from './login';
import * as transactionsActions from './transactions';
import * as walletActions from './wallet';

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
