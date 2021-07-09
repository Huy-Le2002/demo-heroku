package controller;

import model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import service.ICustomerService;

import java.util.Optional;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private ICustomerService customerService;

    @GetMapping
    public ResponseEntity<Iterable<Customer>> allCustomer() {
        return new ResponseEntity<>(customerService.findAllByOrderByIdDesc(), HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer) {
        return new ResponseEntity<>(customerService.save(customer), HttpStatus.CREATED);
    }

    @GetMapping("/list")
    public ModelAndView getAllCustomerPage() {
        ModelAndView modelAndView = new ModelAndView("/customer/list");
        modelAndView.addObject("customers",customerService.findAllByOrderByIdDesc());
        return modelAndView;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Customer> deleteCustomer(@PathVariable long id) {
        Optional<Customer> customerOptional = customerService.findById(id);
        customerService.remove(id);
        return new ResponseEntity<>(customerOptional.get(), HttpStatus.NO_CONTENT);
    }

    @GetMapping("/api/{id}")
    public ResponseEntity<Customer> showApi(@PathVariable long id){
        Optional<Customer> optional = customerService.findById(id);
        return new ResponseEntity<>(optional.get(),HttpStatus.OK);
    }

    @PutMapping("/edit")
    public ResponseEntity<Customer> customerResponseEntity(@RequestBody Customer customer){
        return new ResponseEntity<>(customerService.save(customer),HttpStatus.OK);
    }


//    @GetMapping("/customer")
//    private ModelAndView listCustomer() {
//        Iterable<Customer> customers = customerService.findAll();
//        ModelAndView modelAndView = new ModelAndView("customer/list");
//        modelAndView.addObject("customer",new Customer());
//        modelAndView.addObject("customers",customers);
//        return modelAndView;
//    }
//
//
//    @PostMapping("/create-customer")
//    private ModelAndView saveCustomer(@ModelAttribute("customer") Customer customer) {
//        customerService.save(customer);
//        Iterable<Customer> listCustomer = customerService.findAll();
//        ModelAndView modelAndView = new ModelAndView("customer/list");
//        modelAndView.addObject("customers", listCustomer);
//        return modelAndView;
//    }
//
//    @GetMapping("/edit-customer/{id}")
//    private ModelAndView showEditForm(@PathVariable Long id) {
//        Optional<Customer> customer = customerService.findById(id);
//        ModelAndView modelAndView = new ModelAndView("customer/list");
//        modelAndView.addObject("customer",customer);
//        return modelAndView;
//    }
//
//    @PostMapping("/edit-customer")
//    private ModelAndView updateCustomer(@ModelAttribute("customer") Customer customer) {
//        customerService.save(customer);
//        ModelAndView modelAndView = new ModelAndView("customer/list");
//        modelAndView.addObject("customer", customer);
//        modelAndView.addObject("message","Customer updated successfully");
//        return modelAndView;
//    }
//
////    @DeleteMapping("/{id}")
////    public ResponseEntity<Customer> deleteCustomer(@PathVariable Long id) {
//////        Optional<Customer> customer = customerService.findById(id);
////        customerService.remove(id);
////    }
//
//
//    @GetMapping("/delete-customer/{id}")
//    private ModelAndView showDeleteForm(@PathVariable Long id) {
//        Optional<Customer> customer = customerService.findById(id);
//        ModelAndView modelAndView = new ModelAndView("customer/delete");
//        modelAndView.addObject("customer",customer);
//        return modelAndView;
//    }
//
//    @PostMapping("/delete-customer")
//    private String deleteCustomer(@ModelAttribute("customer") Customer customer) {
//        customerService.remove(customer.getId());
//        return "redirect:customer";
//    }
}
