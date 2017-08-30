const message = $('.message');
const username = $('#name');
const email = $("#email");
const submit = $('#submit');
const nick = $('#nick');
const info = $('#Info');
const search = $('#search');
const tbody = $('#user-info');
const table = $('.table');
const searchText = $('#searchText');

const editNick = $('#editNick');
const editInfo = $('#editInfo');
const cancelBtn = $('#cancel');
const editBtn = $('#editBtn');
const formBox = $('.edit-form');

const loginForm = $('.login-form');
const loginname = $('#loginname');
const password = $('#password');
const loginBtn = $('#login');
const showLogin = $('#loginBtn');
const showRegister = $('#registerBtn');
const cancelLogin = $('#cancelLogin');
const loginInfo = $('.loginInfo');
const addUser = $('.addUser');
const man = $('#man');
const women = $('#women');
const motto = $('#motto');
const interest = $('#interest');
const confirmPassword = $('#confirmPassword');

const notlogin = $('.notlogin');
const haslogin = $('.haslogin');
const showname = $('.showname');
const signout = $('#signout');

let editId = '';

const url = 'http://127.0.0.1:3000';
let timer;

const checkUserInfo = () => {
  const oldToken = localStorage.getItem('login_token');
  if (oldToken) {
    addUser.style.display = 'block';
    axios.get(`${url}/api/user/userInfo`, {
      params: {
        token: oldToken
      },
    }).then(({
      data
    }) => {
      const {
        info
      } = data;
      info.sex = info.sex === 1 ? '男孩子' : '女孩子';
      notlogin.style.display = 'none';
      haslogin.style.display = 'block';
      showname.innerHTML = `
        <span>${info.loginname}<span>
        |
        <span>${info.sex}<span>
        |
        <span>${info.motto}<span>
      `
    }).catch(err => {
      if (err.response.status === 401) {
        showMess('登陆过期，请重新登陆');
        localStorage.removeItem('login_token');
        sign('signout');
      }
    });
  }
}

checkUserInfo();

searchUser();

const showMess = text => {
  timer && clearTimeout(timer);
  message.style.top = '0';
  message.innerHTML = text;
  timer = setTimeout(() => {
    message.style.top = '-40px';
  }, 1000)
}

const sign = active => {
  if (active === 'signin') {
    addUser.style.display = 'block';
    loginForm.style.display = 'none';
    notlogin.style.display = 'none';
    haslogin.style.display = 'block';
  } else {
    addUser.style.display = 'none';
    notlogin.style.display = 'block';
    haslogin.style.display = 'none';
  }
}

function getInfoByToken(token) {

}

function searchUser() {
  const search = searchText.value || null;
  server.get(`${url}/api/user/getUsers`, {
      search
    })
    .then(({
      data
    }) => {
      table.style.display = 'table';
      if (!data.length) {
        tbody.innerHTML = '<tr><td colspan="6">没有数据</td></tr>';
      } else {
        var dataTbody = data.map((item, index) => `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.email}</td><td>${item.nick}</td><td>${item.detail_info}</td><td><button class="btn btn-primary" onclick="edit(${item.id})">编辑</button><button type="button" class="btn btn-danger" onclick="deleteOne(${item.id})">删除</button></td></tr>`);
        tbody.innerHTML = dataTbody.join('');
      }
    })
    .catch(err => {
      throw err;
    });
}

submit.addEventListener('click', () => {
  const body = {
    name: username.value,
    email: email.value,
    nick: nick.value,
    detail_info: info.value,
  };
  if (body.name && body.email && body.nick && body.detail_info) {
    axios({
      method: 'post',
      url: `${url}/api/user/createUser`,
      headers: {
        'x-access-token': localStorage.getItem('login_token') || ''
      },
      data: body
    }).then(({
      data
    }) => {
      if (data.suss) {
        showMess('添加成功');
        username.value = '';
        email.value = '';
        nick.value = '';
        info.value = '';
        searchUser();
      } else {
        showMess('添加失败');
      }
    }).catch(err => {
      if (err.response.status === 401) {
        showMess('登陆过期，请重新登陆');
        localStorage.removeItem('login_token');
        sign('signout');
        username.value = '';
        email.value = '';
        nick.value = '';
        info.value = '';
      } else if (err.response.status === 403) {
        showMess('请登陆');
      };
    })
  } else {
    showMess('每一项都是必填的!');
  }
}, false)

search.addEventListener('click', searchUser, false);

function deleteOne(id) {
  server.delete(`${url}/api/user/deleteUser`, {
    id
  }).then(({
    data
  }) => {
    if (data.suss) {
      showMess('删除成功');
      searchUser();
    } else {
      showMess('删除失败');
    }
  }).catch(err => {
    showMess('出错,请检查网络');
  })
}

function edit(id) {
  formBox.style.display = 'flex';
  editId = id;
}

function closeBox() {
  formBox.style.display = 'none';
}

cancelBtn.addEventListener('click', closeBox, false);
editBtn.addEventListener('click', () => {
  const body = {
    nick: editNick.value,
    detail_info: editInfo.value,
  };
  if (body.nick && body.detail_info) {
    server.put(`${url}/api/user/editUser/${editId}`, body).then(({
      data
    }) => {
      closeBox();
      if (data.suss) {
        showMess('修改成功');
        editNick.value = '';
        editInfo.value = '';
        searchUser();
      } else {
        showMess('修改失败');
      }
    }).catch(err => {
      showMess('出错，请检查网络');
    })
  } else {
    showMess('每一项都是必填的!');
  }
}, false)

let options = '';

showLogin.addEventListener('click', function () {
  loginForm.style.display = 'flex';
  options = 'login';
  loginInfo.style.display = 'none';
}, false)

showRegister.addEventListener('click', function () {
  loginForm.style.display = 'flex';
  options = 'register';
  loginInfo.style.display = 'block';
}, false)

cancelLogin.addEventListener('click', function () {
  loginForm.style.display = 'none';
}, false)

loginBtn.addEventListener('click', function () {
  if (!loginname.value || !password.value) {
    showMess('不能为空!');
  } else {
    if (options === 'login') {
      const body = {
        loginname: loginname.value,
        password: md5(password.value),
      };
      server.post(`${url}/api/login`, body).then(({
        data
      }) => {
        if (data.success) {
          loginname.value = '';
          password.value = '';
          localStorage.setItem('login_token', data.token);
          sign('signin');
          checkUserInfo();
        } else {
          showMess(data.errMessage);
        }
      })
    } else {
      if (confirmPassword.value !== password.value) {
        showMess('两次输入的密码不相同');
        return false;
      }
      const sex = man.checked ? 1 : 0;
      const body = {
        loginname: loginname.value,
        password: md5(password.value),
        sex,
        motto: motto.value,
        interest: interest.value
      };
      server.post(`${url}/api/auth`, body).then(({
        data
      }) => {
        if (data.succ === 'existed') {
          showMess('账号已经存在');
        } else if (!data.succ) {
          showMess('账号创建失败，请重新注册');
        } else {
          showMess('注册成功');
          loginForm.style.display = 'none';
          loginname.value = '';
          password.value = '';
        }
      });
    }
  }

}, false)

signout.addEventListener('click', function () {
  localStorage.removeItem('login_token');
  sign('signout');
}, false)