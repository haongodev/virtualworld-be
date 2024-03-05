export const currentDateTimeToString = (date) => {
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    return date.getFullYear() + '-' + (mm > 9 ? '' : '0') + mm + '-' + (dd > 9 ? '' : '0') + dd + ' ' + (h > 9 ? '' : '0') + h + ':' + (m > 9 ? '' : '0') + m + ':' + (s > 9 ? '' : '0') + s;
}
export const findNonMatchingItems = (arr1, arr2,keysToCompare) => {
    const nonMatchingItems = [];
    arr1.forEach((item1) => {
      const matchingItem = arr2.find((item2) =>
        keysToCompare.every((key) => key === "qty" ? parseFloat(item1[key]) === parseFloat(item2[key]) : item1[key] === item2[key])
      );
      if (!matchingItem) {
        nonMatchingItems.push(item1);
      }
    });
    return nonMatchingItems.length > 0 ? nonMatchingItems : null;
}

export const vietnameseToSlug = (str) => {
  // Chuyển chuỗi sang dạng slug
  str = str.toLowerCase().trim();

  // Tạo một bảng chữ cái tương ứng với dấu tiếng Việt
  const from = "àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ";
  const to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd";

  // Loại bỏ dấu tiếng Việt
  for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  // Loại bỏ các ký tự không phải chữ cái, số, hoặc dấu gạch ngang
  str = str.replace(/[^a-z0-9\-]/g, '-');

  // Loại bỏ các dấu gạch ngang liên tiếp
  str = str.replace(/-+/g, '-');

  // Loại bỏ dấu gạch ngang ở đầu và cuối chuỗi
  str = str.replace(/^-+|-+$/g, '');

  return str;
}