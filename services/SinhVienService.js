// Lớp đối tượng chứa các phương thức giao tiếp với BE

var SinhVienService = function() {
    this.layDanhSachSinhVien = function () {
        // cách 1
        // return ({
        //     url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', //BE cung cap
        //     method: 'GET' // BE cung cap
        // });

        //Cách 2
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', //BE cung cap
            method: 'GET' // BE cung cấp
        })
        return promise;
    }

    this.xoaSinhVien = function (maSinhVien) {
        var promise = axios({
            url: `http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=` + maSinhVien,
            method: 'DELETE',
        });
        return promise;
    }

    this.themSinhVien = function (sv) {
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien', // API backend cung cấp
            method: 'POST', // Giao thức backend cung cấp
            data: sv // Dữ liệu gửi đi ( lưu ý: dữ liệu gửi đi phải đúng format dữ liệu của BE yêu cầu)
    
        });
        return promise;
    }
}