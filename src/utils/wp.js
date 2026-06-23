export const wp = () => {
    window.location.href = "https://api.whatsapp.com/send/?phone=919661781584&text=Hello+I+am+interested+in+your+services+of+Supertrade.pro"
}

export const mail = (body) => {
    body = encodeURIComponent(body);
    window.location.href = "mailto:dummy@example.com?subject=Inquire+About+SuperTrade&body=Hello+I+am+interested+in+your+services";
}