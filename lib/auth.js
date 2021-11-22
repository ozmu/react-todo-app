export async function setUserCookie(request, response) {
    const token = request.cookies.cfAccessKey;
    response.cookie('cfAccessKey', token, {})
}