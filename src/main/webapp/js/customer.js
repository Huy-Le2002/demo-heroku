
function addNewCustomer() {
    let name = $('#name').val();
    let email = $('#email').val();
    let password = $('#password').val();
    let phone = $('#phone').val();
    let address = $('#address').val();
    let newCustomer = {
    name: name,
    password: password,
    email: email,
    phone: phone,
    address: address
};
    $.ajax({
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
},
    type: "POST",
    data: JSON.stringify(newCustomer),
    url: "/customer",
    success: successHandler
});
    event.preventDefault();
}

    function successHandler() {
    $.ajax({
        type: "GET",
        url: "/customer",
        success: function (data) {
            let content = '    <tr>\n' +
                '        <td>#</td>\n' +
                '        <td>Name</td>\n' +
                '        <td>Email</td>\n' +
                '        <td>Phone</td>\n' +
                '        <td>Address</td>\n' +
                '        <td>Edit</td>\n' +
                '        <td>Delete</td>\n' +
                '    </tr>';
            for (let i = 0; i < data.length; i++) {
                content += getCustomer(data[i]);
            }
            document.getElementById('customerList').innerHTML = content;
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            })
            $('.deleteCustomer').click(function (event) {
                let a = $(this);
                let customerId = a.attr("href");
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        );
                        $.ajax({
                            type: "DELETE",
                            url: `/customer/${customerId}`,
                            success: function (data) {
                                a.parent().parent().remove();
                            }
                        });
                    }
                })
                event.preventDefault();
            })
        }
    })
}

    function getCustomer(customer) {
    return `<tr>
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.address}</td>
            <td>
                 <a class="editCustomer">
                        <button type="button" onclick="loadEditData('${customer.id}')" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">
                            <i class="far fa-edit"></i>Edit
                        </button>
                 </a>
            </td>
            <td>
                <a class="deleteCustomer" href="${customer.id}">
                        <button  type="button" class="btn btn-outline-danger" data-th-attr="data-id=${customer.id}">
                            <i class="fas fa-trash-alt"></i>Delete
                        </button>
                </a>
            </td>

        </tr>`;
}

    $(document).ready(function () {
    $('.deleteCustomer').click(function (event) {
        let a = $(this);
        let customerId = a.attr("href");
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
                $.ajax({
                    type: "DELETE",
                    url: `/customer/${customerId}`,
                    success: function (data) {
                        a.parent().parent().remove();
                    }
                });
            }
        })
        event.preventDefault();
    })
})

    function loadEditData(id){
        $.ajax({
            type: 'GET',
            url: '/customer/api/' + id,
            success: function (customer) {
                $('#exampleModalLabelSpan').text("Edit");
                $('#upId').val(customer.id);
                $('#upName').val(customer.name);
                $('#upEmail').val(customer.email);
                $('#upPhone').val(customer.phone);
                $('#upAddress').val(customer.address);
            }
        });
    }

    function editCustomer() {
        let id = $('#upId').val();
        let name = $('#upName').val();
        let email = $('#upEmail').val();
        let phone = $('#upPhone').val();
        let address = $('#upAddress').val();
        let newCustomer = {
            id: id,
            name: name,
            email: email,
            phone: phone,
            address: address
        }
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "PUT",
            data: JSON.stringify(newCustomer),
            url: '/customer/edit',
            success: successHandler
        })
        event.preventDefault();
    }


    // function editCustomer(){
    //     $.ajax({
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         type: "POST",
    //         url: '/customer/edit/' + id,
    //         success: function (customer) {
    //             console.log(customer);
    //             $('#row' + id + ' td').remove();
    //             $('#row' + id).html(`
    //                     <td>${customer.id}</td>
    //                     <td>${customer.name}</td>
    //                     <td>${customer.email}</td>
    //                     <td>${customer.phone}</td>
    //                     <td>${customer.address}</td>
    //                    <td><button onclick="loadEditData('${customer.id}')"  data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"  class="updateCustomer btn btn-outline-primary" href="' + customer.id + '"><a><i class="fas fa-edit">Edit</i></a></button><input type="hidden" id="id" value="' + customer.id + '"></td>
    //                   <td><button class="btn btn-outline-danger" onclick="deleteCustomer('${customer.id}',this)"   ><i
    //                 class="fas fa-trash-alt"></i>Delete</button></td>`);
    //
    //             $('.close-modal').click();
    //             Swal.fire({
    //                 position: 'top-end',
    //                 icon: 'success',
    //                 title: 'You have changed successfull',
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             })
    //         }
    //     });
    // }


    // function addNewCustomer() {
    //     let name = $('#name').val();
    //     let email = $('#email').val();
    //     let password = $('#password').val();
    //     let phone = $('#phone').val();
    //     let address = $('#address').val();
    //     let newCustomer = {
    //         name: name,
    //         password: password,
    //         email: email,
    //         phone: phone,
    //         address: address
    //     };
    //     $.ajax({
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         type: "POST",
    //         data: JSON.stringify(newCustomer),
    //         //tên API
    //         url: "/customer",
    //         //xử lý khi thành công
    //         success: function (customer) {
    //             $('#customerList tbody').prepend(' <tr id="row' + customer.id + '">\n' +
    //                 '      <td>' + customer.id + '</td>\n' +
    //                 '      <td>' + customer.name + '</td>\n' +
    //                 '      <td>' + customer.password + '</td>\n' +
    //                 '      <td>' + customer.email + '</td>\n' +
    //                 '      <td>' + customer.phone + '</td>\n' +
    //                 '      <td>' + customer.address + '</td>\n' +
    //                 '      <td><button onclick="loadEditData(' + customer.id + ',this)" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"  class=" btn btn-outline-primary" ><a><i class="fas fa-edit">Edit</i></a></button>' +
    //                 '<input type="hidden" id="id" value="' + customer.id + '"></td>\n' +
    //
    //                 ' <td><button class="btn btn-outline-danger" onclick="deleteCustomer(' + customer.id + ',this)">' +
    //                 '<i class="fas fa-trash-alt"></i>Delete </button> </td>' +
    //                 ' </tr>');
    //             //sư kiện nào thực hiện Ajax
    //             $('.close-modal').click();
    //             Swal.fire({
    //                 position: 'top-end',
    //                 icon: 'success',
    //                 title: 'Your work has been saved',
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             })
    //         }
    //     });
    // }

    // function deleteCustomer(customerId,button){
    //     let a = button;
    //     const swalWithBootstrapButtons = Swal.mixin({
    //         customClass: {
    //             confirmButton: 'btn btn-success',
    //             cancelButton: 'btn btn-danger'
    //         },
    //         buttonsStyling: false
    //     })
    //     swalWithBootstrapButtons.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonText: 'Yes, delete it!',
    //         cancelButtonText: 'No, cancel!',
    //         reverseButtons: true
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             $.ajax({
    //                 type: "DELETE",
    //                 url: `/customer/${customerId}`,
    //                 //xử lý khi thành công
    //                 success: function (data) {
    //                     a.closest ('tr').remove ();
    //                     swalWithBootstrapButtons.fire(
    //                         'Deleted!',
    //                         'Your file has been deleted.',
    //                         'success'
    //                     );
    //                 }
    //             });
    //             //chặn sự kiện mặc định của thẻ
    //         } else if (
    //             /* Read more about handling dismissals below */
    //             result.dismiss === Swal.DismissReason.cancel
    //         ) {
    //             swalWithBootstrapButtons.fire(
    //                 'Cancelled',
    //                 'Your imaginary file is safe :)',
    //                 'error'
    //             )
    //         }
    //     })
    //     event.preventDefault();
    // }
