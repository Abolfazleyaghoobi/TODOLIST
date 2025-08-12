export function RemoveModule(conItem){ // conItem همان UL است
    console.log('conItem: ', conItem); 

    // از event delegation استفاده می‌کنیم
    conItem.addEventListener("click",(e)=>{
        // ابتدا مطمئن می‌شویم که روی آیکون حذف کلیک شده است
        // بهتر است به جای id از class استفاده کنید چون آیکون‌های حذف متعدد هستند
        if (e.target.classList.contains('removeTask')) { // فرض کردیم کلاس آیکون 'removeTask' است
            
            // با استفاده از closest()، والد <li> را پیدا می‌کنیم
            const taskItem = e.target.closest('li');
            // console.log('taskItem: ', taskItem);

            // حالا می‌توانیم به data-id آن دسترسی پیدا کنیم
            const dataId = taskItem.id;
            
            // مقدار data-id را در کنسول نمایش می‌دهیم
            console.log('Data ID:', dataId);

            // حالا می‌توانید با استفاده از این dataId، تسک را از دیتابیس یا آرایه حذف کنید
            
            // و در نهایت، خود عنصر <li> را از صفحه حذف کنید
            // taskItem.remove();
        }
    })
}