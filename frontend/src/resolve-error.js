export default function resolveError(error, router) {
    console.error(error);
    if (error.response.data.status === 401)
        router.push({name: 'Login'});
    else if (error.response.data.message)
        alert(error.response.data.message);
}
