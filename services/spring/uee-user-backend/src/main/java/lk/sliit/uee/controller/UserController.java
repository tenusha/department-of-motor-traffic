/**
 * 
 */
package lk.sliit.uee.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lk.sliit.uee.domain.UserDTO;
import lk.sliit.uee.exception.MyFileNotFoundException;
import lk.sliit.uee.model.User;
import lk.sliit.uee.service.FileService;
import lk.sliit.uee.service.UserService;

/**
 * @author Vimukthi Rajapaksha
 * @date Aug 28, 2019
 */
@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

	@Autowired
	UserService userService;
	@Autowired
	private FileService fileService;

	@GetMapping("")
	public ResponseEntity<?> getUsers() {
		ResponseEntity<?> responseEntity = null;
		try {
			responseEntity = new ResponseEntity<>(userService.getAll(), HttpStatus.OK);
		} catch (Exception e) {
			responseEntity = new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
		}
		return responseEntity;
	}

	/**
	 * This method will save a new user in the database
	 */
	@PostMapping("")
	public ResponseEntity<?> register(@Valid @RequestBody User user) {
		ResponseEntity<?> responseEntity = null;
		try {
			responseEntity = new ResponseEntity<>(userService.save(user), HttpStatus.OK);
		} catch (Exception e) {
			responseEntity = new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
		}
		return responseEntity;
	}

	/**
	 * This method will return user by its email and pwd
	 */
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody UserDTO userDTO) {
		ResponseEntity<?> responseEntity = null;
		try {
			responseEntity = new ResponseEntity<>(userService.getByEmailAndPassword(userDTO), HttpStatus.OK);
		} catch (Exception e) {
			responseEntity = new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
		}
		return responseEntity;
	}

	/**
	 * This method will return user by its email
	 */
	@GetMapping("/{email}")
	public ResponseEntity<?> getUser(@PathVariable("email") String email) {
		ResponseEntity<?> responseEntity = null;
		try {
			responseEntity = new ResponseEntity<>(userService.getByEmail(email), HttpStatus.OK);
		} catch (Exception e) {
			responseEntity = new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
		}
		return responseEntity;
	}

	@GetMapping("/img/{fileName:.+}")
	public ResponseEntity<Object> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
		String contentType = null;
		Resource resource = null;
		try {
			// Load file as Resource
			resource = fileService.loadFileAsResource(fileName);

			// Try to determine file's content type
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		} catch (MyFileNotFoundException ex) {
			return new ResponseEntity<>("File not found", HttpStatus.OK);
		} catch (IOException ex) {
			return new ResponseEntity<>("Sorry! something went wrong, try again.", HttpStatus.BAD_GATEWAY);
		}

		// Fallback to the default content type if type could not be determined
		if (contentType == null) {
			contentType = "application/octet-stream";
		}

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}
}
