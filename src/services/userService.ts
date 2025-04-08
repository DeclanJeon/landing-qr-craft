
/**
 * User authentication service
 */
const userService = {
  /**
   * Sends a verification code to the specified email
   */
  async sendNumber(email: string): Promise<{ success: boolean, otp: string }> {
    try {
      // In a real application, this would make an API call to send the code
      // For demo purposes, we're generating a code locally
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Log for development/testing purposes
      console.log('인증코드:', otp);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return { success: true, otp };
    } catch (error) {
      console.error('Failed to send verification code:', error);
      return { success: false, otp: '' };
    }
  },

  /**
   * Handles user login after successful verification
   */
  async login(email: string): Promise<boolean> {
    try {
      // Store user data in localStorage
      localStorage.setItem('peermall-user-authenticated', 'true');
      localStorage.setItem('peermall-user-email', email);
      localStorage.setItem('peermall-user-nickname', email.split('@')[0]);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }
};

export default userService;
