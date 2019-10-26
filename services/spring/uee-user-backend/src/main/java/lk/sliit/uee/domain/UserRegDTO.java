/**
 * 
 */
package lk.sliit.uee.domain;

import javax.validation.constraints.NotBlank;

/**
 * @author Vimukthi Rajapaksha
 * @date Aug 28, 2019
 */
public class UserRegDTO {
	@NotBlank
	private String id;
	@NotBlank
	private String fname;
	@NotBlank
	private String lname;
	@NotBlank
	private String email;
	@NotBlank
	private String license;
	private String profilePic;

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the fname
	 */
	public String getFname() {
		return fname;
	}

	/**
	 * @param fname the fname to set
	 */
	public void setFname(String fname) {
		this.fname = fname;
	}

	/**
	 * @return the lname
	 */
	public String getLname() {
		return lname;
	}

	/**
	 * @param lname the lname to set
	 */
	public void setLname(String lname) {
		this.lname = lname;
	}

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
	 * @return the license
	 */
	public String getLicense() {
		return license;
	}

	/**
	 * @param license the license to set
	 */
	public void setLicense(String license) {
		this.license = license;
	}

	/**
	 * @return the profilePic
	 */
	public String getProfilePic() {
		return profilePic;
	}

	/**
	 * @param profilePic the profilePic to set
	 */
	public void setProfilePic(String profilePic) {
		this.profilePic = profilePic;
	}

	@Override
	public String toString() {
		return "UserRegDTO [id=" + id + ", fname=" + fname + ", lname=" + lname + ", email=" + email + ", license="
				+ license + ", profilePic=" + profilePic + "]";
	}

}
