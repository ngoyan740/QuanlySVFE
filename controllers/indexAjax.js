// console.log(axios);

// Kết nối BE dựa vào thư viện axios

// var mangSinhVien = [];
var svService = new SinhVienService();

var layDanhSachSinhVienApi = function () {

    // var objectAjax = {
    //     url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', //BE cung cap
    //     method: 'GET' // BE cung cap
    // }

    // var promise = axios(objectAjax); // Gọi đến BE lấy data

   var promise = svService.layDanhSachSinhVien();

    // xử lý cho trường hợp gọi từ BE thành công
    promise.then(function(result) {
        console.log('Kết quả', result);

        // Lấy dữ liệu serever trả về gọi hàm tạo table
        renderTable(result.data)
    });

    //Xử lý cho trường hợp thất bại
    promise.catch(function(error) {
        console.log(error);
    });

  
}


var renderTable = function(mangSinhVien) {

    var noiDungTable = '';
    for (var i = 0; i < mangSinhVien.length; i++) {
        // Từ dữ liệu API tạo đối tượng lưu trữ
        var sv = new SinhVien();
        sv.maSinhVien = mangSinhVien[i].maSinhVien;
        sv.tenSinhVien = mangSinhVien[i].tenSinhVien;
        sv.email = mangSinhVien[i].email;
        sv.diemToan = mangSinhVien[i].diemToan;
        sv.diemLy = mangSinhVien[i].diemLy;
        sv.diemHoa = mangSinhVien[i].diemHoa;
        sv.diemRenLuyen = mangSinhVien[i].diemRenLuyen;


        // Tạo các tr chứa thông tin sinh viên tương ứng
        noiDungTable +=
            `
            <tr>
                <td>${sv.maSinhVien}</td>
                <td>${sv.tenSinhVien}</td>
                <td>${sv.email}</td>
                <td>${sv.tinhDiemTrungBinh()}</td>
                <td>${sv.xepLoai()}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSinhVien}')">Xóa</button>
                    <button class="btn btn-info" onclick="suaThongTinSinhVien('${sv.maSinhVien}')">Chỉnh sửa</button>
                </td>
            </tr>
            `;
    }

    document.querySelector('#tableSinhVien').innerHTML = noiDungTable;

}

layDanhSachSinhVienApi();

// Chức năng thêm sinh viên lưu trữ vào server thông qua api backend
document.querySelector('#btnXacNhan').onclick = function () {
    // Lấy dữ liệu từ ng dùng nhập vào chứa vào 1 đối tượng

    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sv.email = document.querySelector('#email').value;

    console.log('Sinh viên', sv);

    // DÙng axios đưa dữ liệu về server thông qua  api backend cung cấp
    // var promise = axios({
    //     url: 'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien', // API backend cung cấp
    //     method: 'POST', // Giao thức backend cung cấp
    //     data: sv // Dữ liệu gửi đi ( lưu ý: dữ liệu gửi đi phải đúng format dữ liệu của BE yêu cầu)

    // });

    var promise = svService.themSinhVien(sv);

    //Hàm thực thi khi gọi ajax thành công
    promise.then(function(result) {
        console.log(result.data);

        // tự động reload web -> làm browser chạy lại F5
        // location.reload();
        // Phương thức lấy thông tin sv và tạo lại tableau mới
        layDanhSachSinhVienApi();


    });

    //Hàm thực thi khi xảy ra lỗi

    promise.catch(function (error) {
        console.log(error.response.data);
    })

}

// Chức năng xóa data
var xoaSinhVien = function (maSinhVien) {
    // alert(maSinhVien);

    var promise = svService.xoaSinhVien(maSinhVien);

    promise.then(function(result) {
        console.log(result.data);
        layDanhSachSinhVienApi();
    })

    promise.catch(function(error){
        console.log(error.response.data);
    })
}


// Chức năng chỉnh sửa sinh viên

var suaThongTinSinhVien = function(maSinhVien) {
    // alert(maSinhVien);
    document.getElementById('maSinhVien').disabled = true;
    document.getElementById('btnXacNhan').disabled = true;
    document.getElementById('btnXacNhan').className = 'btn btn-secondary';

    var promise = axios({
        url: `http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien= ` + maSinhVien,
        method: 'GET',
    });

    promise.then(function(result) {
        console.log(result.data);
        // Gán dữ liệu server lên giao diện
        // BE đã tìm được dữ liệu maSinhVien cần phải xóa rồi
        var sv = result.data;
        document.querySelector('#maSinhVien').value = sv.maSinhVien;
            document.querySelector('#tenSinhVien').value = sv.tenSinhVien;
            document.querySelector('#loaiSinhVien').value = sv.loaiSinhVien;
            document.querySelector('#diemToan').value = sv.diemToan;
            document.querySelector('#diemLy').value = sv.diemLy;
            document.querySelector('#diemHoa').value = sv.diemHoa;
            document.querySelector('#diemRenLuyen').value = sv.diemRenLuyen;
            document.querySelector('#email').value = sv.email;
    });

    promise.catch(function(error) {
        console.log(error.response.data);
    })
}


// Chức năng lưu thông tin sinh viên server dựa vào api backend cung cấp
document.querySelector('#btnLuuThongTin').onclick = function () {

    // Lấy dữ liệu từ người dùng nhập vào đối tượng theo format dữ liệu của backend yêu cầu
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sv.email = document.querySelector('#email').value;

    // Gọi ajax đưa dữ liệu về serverr cập nhật
    var promise = axios ( {
        url: 'http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=' + sv.maSinhVien,
        method: 'PUT',
        data: sv
    });

    promise.then(function(result) {
        console.log(result.data);
        layDanhSachSinhVienApi();
    });

    promise.catch(function(error){
        console.log(error.response.data);
    })

}