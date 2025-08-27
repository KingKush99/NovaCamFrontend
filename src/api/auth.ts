// src/api/auth.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:9020';

interface UserData {
  email: string;
  password: string;
  username?: string;
  display_name?: string;
}

interface UserProfile {
  id: number;
  email: string;
  username: string;
  display_name: string;
  custodial_address: string;
  bio?: string | null;
  profile_picture_url?: string | null;
  stream_status?: string;
  nova_coin_balance_offchain?: string;
  created_at?: string;
  updated_at?: string;
}

interface AuthResponse {
  message: string;
  token?: string;
  user?: UserProfile;
  updatedProfile?: UserProfile;
}

interface BlockchainTransactionResponse {
  message: string;
  transactionHash: string;
  ipfsCid?: string;
  senderBalance?: string;
  recipientBalance?: string;
}

interface ProfileCreationData {
    username: string;
    description: string;
}

interface TipData {
    recipientAddress: string;
    amount: number;
}

interface ProfileUpdateData {
  displayName?: string;
  bio?: string | null;
  profilePictureUrl?: string | null;
}


const api = axios.create({
  baseURL: API_BASE_URL,
});

export const registerUser = async (userData: UserData): Promise<AuthResponse> => {
  try {
    const response = await api.post('/api/users/register', userData);
    return response.data;
  } catch (error: any) {
    console.error("Registration error:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const loginUser = async (credentials: UserData): Promise<AuthResponse> => {
  try {
    const response = await api.post('/api/users/login', credentials);
    return response.data;
  } catch (error: any) {
    console.error("Login error:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const getUserProfileLegacy = async (token: string): Promise<AuthResponse> => {
  try {
    const response = await api.get('/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Fetch profile (legacy) error:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch legacy profile');
  }
};

export const getNewUserProfile = async (token: string): Promise<AuthResponse> => {
  try {
    const response = await api.get('/api/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Fetch new profile error:", error.response?.data?.error || error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to load profile');
  }
};

export const updateProfile = async (token: string, data: ProfileUpdateData): Promise<AuthResponse> => {
  try {
    const response = await api.put('/api/users/profile', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Update profile error:", error.response?.data?.error || error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to update profile');
  }
};


export const createProfileOnBlockchain = async (token: string, data: ProfileCreationData): Promise<BlockchainTransactionResponse> => {
  try {
    const response = await api.post('/api/nfts/create-profile', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Create blockchain profile error:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Failed to create profile on blockchain');
  }
};

export const sendTip = async (token: string, data: TipData): Promise<BlockchainTransactionResponse> => {
  try {
    const response = await api.post('/api/nfts/tip', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Send tip error:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Failed to send tip');
  }
};