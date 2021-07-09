package repository;

import com.sun.xml.internal.ws.wsdl.writer.document.http.Address;
import model.Customer;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICustomerRepository extends PagingAndSortingRepository<Customer, Long> {
    Iterable<Customer> findAllByOrderByIdDesc();
}

