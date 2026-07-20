const handleSubmit = async () => {
  await fetch(
    "https://script.google.com/macros/s/AKfycby9CcdNknaUMkW-SSCbDdd_o9okRRvOeRF8ZmS0zU_HEuJDxSlg1BC9emC1D5aIT3o-Tw/exec",
    {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        phone
      })
    }
  );

  alert("Submitted successfully!");
};