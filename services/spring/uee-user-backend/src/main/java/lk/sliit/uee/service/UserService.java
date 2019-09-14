/**
 * 
 */
package lk.sliit.uee.service;

import lk.sliit.uee.domain.UserDTO;
import lk.sliit.uee.domain.UserRegDTO;
import lk.sliit.uee.model.User;

/**
 * @author Vimukthi Rajapaksha
 * @date Aug 15, 2019
 */
public interface UserService {

	public User getUserById(String id);

	public UserRegDTO getByEmailAndPassword(UserDTO userDTO);

	public UserRegDTO getByEmail(String email);

	public UserRegDTO save(User user);
}
