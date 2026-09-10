const rooms=[
{id:1,title:"Phòng studio full nội thất",price:2.8,area:"25 m²",location:"Cầu Giấy, Hà Nội",city:"Hà Nội",icon:"🛏️",owner:"Anh Minh",phone:"0900000001",desc:"Phòng sạch sẽ, có điều hòa, nóng lạnh, máy giặt chung. Ra vào tự do."},
{id:2,title:"Phòng mới xây, có gác",price:3.2,area:"30 m²",location:"Thủ Đức, TP. Hồ Chí Minh",city:"TP. Hồ Chí Minh",icon:"🏠",owner:"Chị Lan",phone:"0900000002",desc:"Phòng mới, thoáng, có gác, giờ giấc tự do. Gần chợ và trường đại học."},
{id:3,title:"Phòng giá rẻ gần KCN",price:2.2,area:"20 m²",location:"Yên Phong, Bắc Ninh",city:"Bắc Ninh",icon:"🏢",owner:"Anh Hùng",phone:"0900000003",desc:"Phù hợp người đi làm, an ninh tốt, điện nước tính theo giá nhà nước."},
{id:4,title:"Căn hộ mini 1 phòng ngủ",price:5.5,area:"38 m²",location:"Hải Châu, Đà Nẵng",city:"Đà Nẵng",icon:"🌆",owner:"Chị Hương",phone:"0900000004",desc:"Căn hộ riêng tư, nội thất cơ bản, có thang máy và chỗ để xe."},
{id:5,title:"Phòng có ban công thoáng",price:3.9,area:"28 m²",location:"Thanh Xuân, Hà Nội",city:"Hà Nội",icon:"🌿",owner:"Anh Tuấn",phone:"0900000005",desc:"Ban công rộng, nhiều ánh sáng, khu dân cư yên tĩnh."},
{id:6,title:"Phòng full đồ gần trung tâm",price:4.5,area:"32 m²",location:"Nam Từ Liêm, Hà Nội",city:"Hà Nội",icon:"🛋️",owner:"Chị Mai",phone:"0900000006",desc:"Đầy đủ giường, tủ, điều hòa, nóng lạnh. Có khóa vân tay."}
];

const grid=document.getElementById("roomGrid");
function renderRooms(list){
 grid.innerHTML=list.length?list.map(r=>`<article class="card" onclick="detail(${r.id})">
 <div class="photo">${r.icon}</div><div class="card-body">
 <div class="price">${r.price.toLocaleString("vi-VN")} triệu/tháng</div>
 <div class="title">${r.title}</div><div class="meta">📍 ${r.location}</div>
 <div class="meta">📐 ${r.area}</div><span class="tag">✓ Chủ trọ đăng trực tiếp</span>
 </div></article>`).join(""):`<p>Không tìm thấy phòng phù hợp.</p>`;
 document.getElementById("count").textContent=`${list.length} tin đăng`;
}
function filterRooms(){
 const q=document.getElementById("q").value.toLowerCase(), city=document.getElementById("city").value, p=document.getElementById("price").value;
 renderRooms(rooms.filter(r=>(!q||(r.title+" "+r.location).toLowerCase().includes(q))&&(!city||r.city===city)&&(!p||(p==="3"?r.price<3:p==="5"?r.price>=3&&r.price<=5:r.price>5))));
}
function detail(id){
 const r=rooms.find(x=>x.id===id);
 document.getElementById("modalBody").innerHTML=`<div style="font-size:60px;text-align:center">${r.icon}</div><span class="pill">ĐANG CÒN PHÒNG</span><h2>${r.title}</h2><div class="price">${r.price.toLocaleString("vi-VN")} triệu/tháng</div><p>📍 ${r.location}<br>📐 ${r.area}</p><p>${r.desc}</p><hr><p><b>Chủ trọ:</b> ${r.owner}</p><div style="display:flex;gap:10px"><a class="btn" href="tel:${r.phone}">📞 Gọi chủ trọ</a><button class="btn ghost" onclick="alert('Tính năng chat sẽ được kết nối ở phiên bản Supabase.')">💬 Nhắn tin</button></div>`;
 document.getElementById("modal").classList.remove("hidden");
}
function openPost(){
 document.getElementById("modalBody").innerHTML=`<h2>Đăng phòng miễn phí</h2><p>Đây là form demo. Dữ liệu sẽ được lưu thật khi kết nối Supabase.</p><div class="form">
<label>Tiêu đề<input placeholder="Ví dụ: Phòng studio full nội thất"></label>
<label>Giá thuê (triệu/tháng)<input type="number" step="0.1" placeholder="2.5"></label>
<label>Khu vực<input placeholder="Quận/huyện, tỉnh/thành"></label>
<label>Diện tích<input placeholder="25 m²"></label>
<label>Mô tả<textarea placeholder="Mô tả phòng, điện nước, cọc..."></textarea></label>
<button class="btn" onclick="alert('Đã nhận bản demo. Bước tiếp theo sẽ kết nối database để đăng tin thật.');closeModal()">Đăng tin</button>
</div>`;
 document.getElementById("modal").classList.remove("hidden");
}
function closeModal(){document.getElementById("modal").classList.add("hidden")}
document.getElementById("modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});
renderRooms(rooms);
