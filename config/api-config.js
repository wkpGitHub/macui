const cookie = 'Authorization=eyJhbGciOiJIUzUxMiJ9.eyJkIjo0LCJrIjoiMSIsImV4cCI6MTY4NzI1MjEwOCwibiI6Iuezu-e7n-euoeeQhuWRmCJ9.74hR96FV-gHn4ridOy6345PW9EcQY9HhGHupT7zXqogMwkLfsb8AnluACFDpds-QqQNCcsZBnz2BTqs-jSfeSg'
module.exports = [
  {
    key: 'apiChr',
    target: 'http://10.10.77.106:8080/chr/v2/api-docs?group=chr',
    dir: 'chr',
    beforeRequest: () => ({
      headers: {
        cookie // : 'Authorization=eyJhbGciOiJIUzUxMiJ9.eyJkIjo0LCJrIjoiMSIsImV4cCI6MTY4NjkwNTU2NCwibiI6Iuezu-e7n-euoeeQhuWRmCJ9.23dC28AJKA4PvnlJQ4W3GeIre7kFtHIriC-IPUy4PzPiRNgj9ZI7nZLUeNWgZe1uSTqHdaqbABWqOMvv_LNG-Q'
      }
    })
  },
  {
    key: 'apiBase',
    target: `http://10.10.77.106:8080/chr/v2/api-docs?group=${encodeURIComponent('系统基础api')}`,
    dir: 'base',
    beforeRequest: () => ({
      headers: {
        cookie // : 'Authorization=eyJhbGciOiJIUzUxMiJ9.eyJkIjo0LCJrIjoiMSIsImV4cCI6MTY4NjkwNTU2NCwibiI6Iuezu-e7n-euoeeQhuWRmCJ9.23dC28AJKA4PvnlJQ4W3GeIre7kFtHIriC-IPUy4PzPiRNgj9ZI7nZLUeNWgZe1uSTqHdaqbABWqOMvv_LNG-Q'
      }
    })
  }
]
