/**
 * 
 */
package lk.sliit.uee.domain;

import javax.validation.constraints.NotBlank;

/**
 * @author Vimukthi Rajapaksha
 * @date Aug 28, 2019
 */
public class UserDTO {
	@NotBlank
	private String email;
	@NotBlank
	private String password;

	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "UserDTO [email=" + email + ", password=" + password + "]";
	}
}
