export const wp = () => {
    window.location.href = "https://api.whatsapp.com/send/?phone=910000000000&text=Hello+I+am+interested+in+your+services"
}

export const mail = (body) => {
    body = encodeURIComponent(body);
    window.location.href = "mailto:dummy@example.com?subject=Inquire+About+SuperTrade&body=Hello+I+am+interested+in+your+services";
}