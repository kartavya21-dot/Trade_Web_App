const handleSubmit = async () => {
  await fetch(
    "https://script.google.com/macros/s/AKfycbwGblRx4WW1UZkwvQ7gvVdYh1qXm0E8NzWkOzX-HdaiB4WxZzuKb-xIYPd80YUed0DpDQ/exec",
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