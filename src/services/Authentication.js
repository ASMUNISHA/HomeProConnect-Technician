import AsyncStorage from '@react-native-async-storage/async-storage';

async function getAccount() {
  try {
    const accountData = await AsyncStorage.getItem('account');
    return accountData !== null ? JSON.parse(accountData) : null;
  } catch (error) {
    console.error("Error retrieving account data:", error);
    return null;
  }
}

async function setAccount(data) {
  try {
    await AsyncStorage.setItem('account', JSON.stringify(data));
  } catch (error) {
    console.error("Error setting account data:", error);
  }
}

async function logout() {
  try {
    await AsyncStorage.removeItem('account');
  } catch (error) {
    console.error("Error removing account data:", error);
  }
}

// Export the functions
export default {
  logout,
  getAccount,
  setAccount
};