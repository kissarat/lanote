function stringify(params) {
  const array = []
  for (const key in params) {
    array.push(key + '=' + params[key])
  }
  return array.join(';')
}

async function api(method, uri, params, body) {
  const options = {
    mode: 'cors',
    method,
    headers: {
      accept: 'application/json'
    }
  }
  if (body) {
    options.body = JSON.stringify(body)
    options.headers['content-type'] = 'application/json'
  }
  const r = await fetch(uri + '?' + stringify(params), options)
  return r.json()
}

const socket = io('/')
socket.on('change', function (data) {
  console.log(data)
})
