const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create element & render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().disease_speech;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('FirstCollection').doc(id).delete();
    });
}

// getting data
const dialogflowAgentDoc = db.collection('FirstCollection');
/*
dialogflowAgentDoc.where('disease_speech', '==', "TestBug").get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
        renderCafe(snapshot.docs[0]);
    //});
});
*/
dialogflowAgentDoc.where('disease_speech', '==', "Damping off y Enfermedades de las raíces").where('crops', '==', 'soja').get()
			.then(snapshot => {
                snapshot.docs.forEach(doc => {
                    renderCafe(doc);
                });
				if (!snapshot.docs[0].exists) {
				  console.log("Hay bugs");
				} 
				else {
                    var mensaje='';
					snapshot.docs.map((docs) => {
						mensaje += `${docs.data().name} ` + `\n`;
                        }
                        );
                    console.log(mensaje);
                    //renderCafe(snapshot.docs[0]);
				}
				//return Promise.resolve('Read complete');
			})
			.catch(() => {
				console.log('Hubo un error intentando leer la base de datos');
			});

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('FirstCollection').add({
        name: form.name.value,
        disease_speech: form.disease_speech.value
    });
    form.name.value = '';
    form.disease_speech.value = '';
});

// real-time listener/*
/*db.collection('cafes').orderBy('city').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderCafe(change.doc);
        } else if (change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    });
});*/

// updating records (console demo)
// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     name: 'mario world'
// });

// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     city: 'hong kong'
// });

// setting data
// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').set({
//     city: 'hong kong'
// });