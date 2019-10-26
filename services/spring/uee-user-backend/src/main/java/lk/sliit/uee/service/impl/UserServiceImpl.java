/**
 * 
 */
package lk.sliit.uee.service.impl;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import lk.sliit.uee.domain.UserDTO;
import lk.sliit.uee.domain.UserRegDTO;
import lk.sliit.uee.model.User;
import lk.sliit.uee.repository.UserRepository;
import lk.sliit.uee.service.FileService;
import lk.sliit.uee.service.UserService;

/**
 * @author Vimukthi Rajapaksha
 * @date Aug 15, 2019
 */
@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;
	@Autowired
	FileService fileService;

	/**
	 * This method will return User object by its id
	 */
	@Override
	public List<User> getAll() {
		return userRepository.findAll();
	}

	/**
	 * This method will return User object by its id
	 */
	@Override
	public User getUserById(String id) {
		return userRepository.findById(id).orElse(null);
	}

	/**
	 * This method will return User object using email and password
	 */
	@Override
	public UserRegDTO getByEmailAndPassword(UserDTO userDTO) {
		Optional<User> oUser = userRepository.findByEmailAndPassword(userDTO.getEmail().trim(),
				hashPassword(userDTO.getPassword().trim().getBytes()));
		if (oUser.isPresent()) {
			return convertToDTO(oUser.get());
		} else {
			return null;
		}
	}

	/**
	 * This method will return User object by email
	 */
	@Override
	public UserRegDTO getByEmail(String email) {
		Optional<User> oUser = userRepository.findByEmail(email);
		if (oUser.isPresent()) {
			return convertToDTO(oUser.get());
		} else {
			return null;
		}
	}

	/**
	 * This method will save user object to database
	 */
	@Override
	public UserRegDTO save(User user) {
		if (Objects.isNull(user.get_id())) {
			user.setPassword(hashPassword(user.getPassword().getBytes()));
			user.set_id(UUID.randomUUID());
			if (Objects.nonNull(user.getImage())) {
				String fileName = fileService.storeFile(user.getImage());

				String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/users/img/")
						.path(fileName).toUriString();
				user.setImagePath(fileDownloadUri);
			}
		}
		return convertToDTO(userRepository.save(user));
	}

	private String hashPassword(byte[] plainPassword) {
		return DigestUtils.md5DigestAsHex(plainPassword).toUpperCase();
	}

	private UserRegDTO convertToDTO(User user) {
		UserRegDTO userRegDTO = new UserRegDTO();
		userRegDTO.setEmail(user.getEmail());
		userRegDTO.setFname(user.getFirstName());
		userRegDTO.setLname(user.getLastName());
		userRegDTO.setId(String.valueOf(user.get_id()));
		userRegDTO.setLicense(user.getLicense());
		userRegDTO.setProfilePic(user.getImagePath());

		return userRegDTO;
	}
}
