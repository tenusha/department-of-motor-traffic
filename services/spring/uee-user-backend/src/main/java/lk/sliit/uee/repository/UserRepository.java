/**
 * 
 */
package lk.sliit.uee.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import lk.sliit.uee.model.User;

/**
 * @author Vimukthi Rajapaksha
 * @date Aug 15, 2019
 */
public interface UserRepository extends MongoRepository<User, String> {
	public Optional<User> findByEmailAndPassword(String email, String password);

	public Optional<User> findByEmail(String email);
}
