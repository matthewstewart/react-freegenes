function sortObjArrByAttr(objArray, attr) {
  return objArray.sort((a, b) => {
    if (a[`${attr}`] > b[`${attr}`]) { return 1; }
    if (a[`${attr}`] < b[`${attr}`]) { return -1; }
    return 0;
  });
}

function convertCollection(collection) {
  // result is root tree node
  let result = {
    name: `Collection: ${collection.name}`,
    toggled: true,
    children: [
      {
        name: 'Sub-Collections',
        children: []
      }
    ]
  };
  const subcollections = collection.subcollections || [];
  for (let i = 0; i < subcollections.length; i++) {
    const subcollection = subcollections[i];
    const subCollectionObj = Tree.convertSubCollection(subcollection);
    result.children[0].children.push(subCollectionObj);
  }
  // sort collection subcollections by name attr
  result.children[0].children = Tree.sortObjArrByAttr(result.children[0].children, 'name');
  result.children[0].name = `Sub-Collections (${result.children[0].children.length})`;
  return result;  
}

function convertSubCollection(subCollection) {
  const subCollectionObj = {
    name: subCollection.name,
    children: [
      {
        name: 'Parts',
        children: []
      }
    ]
  };
  const parts = subCollection.parts;
  // convert each subcollection part to tree data
  for (let j = 0; j < parts.length; j++) {
    const part = parts[j];
    const partObj = Tree.convertPart(part);
    subCollectionObj.children[0].children.push(partObj);
  }
  // sort subcollection parts by name attr
  subCollectionObj.children[0].children = Tree.sortObjArrByAttr(subCollectionObj.children[0].children, 'name');
  subCollectionObj.children[0].name = `Parts (${subCollectionObj.children[0].children.length})`;
  return subCollectionObj; 
}

function convertPart(part) {
  const partObj = {
    name: part.name,
    children: []
  };
  part.time_created && partObj.children.push({ name: `Created: ${part.time_created}`});
  part.time_updated && partObj.children.push({ name: `Updated: ${part.time_updated}`});
  part.description && partObj.children.push({ name: `${part.description}`});
  part.status && partObj.children.push({ name: `Status: ${part.status}`});
  part.gene_id && partObj.children.push({ name: `Gene ID: ${part.gene_id}`});
  part.part_type && partObj.children.push({ name: `Part Type: ${part.part_type}`});
  part.primer_for && partObj.children.push({ name: `Primer For: ${part.primer_for}`});
  part.primer_rev && partObj.children.push({ name: `Primer Rev: ${part.primer_rev}`});
  part.original_sequence && partObj.children.push({ 
    name: `Original Sequence`,
    children: [
      { name: `${part.original_sequence}`}
    ]
  });
  part.optimized_sequence && partObj.children.push({ 
    name: `Optimized Sequence`,
    children: [
      { name: `${part.optimized_sequence}`}
    ]
  });
  part.synthesized_sequence && partObj.children.push({ 
    name: `Synthesized Sequence`,
    children: [
      { name: `${part.synthesized_sequence}`}
    ]
  });
  part.full_sequence && partObj.children.push({ 
    name: `Full Sequence`,
    children: [
      { name: `${part.full_sequence}`}
    ]
  });
  part.genbank && partObj.children.push({ 
    name: `Genbank`,
    children: [
      { name: `EC_number: ${part.genbank.EC_number}`},
      { name: `GenBank_acc: ${part.genbank.GenBank_acc}`},
      { name: `Source: ${part.genbank.Source}`},
      { name: `gene: ${part.genbank.gene}`},
      { name: `gene_synonyms: ${part.genbank.gene_synonyms}`},
      { name: `locus_tag: ${part.genbank.locus_tag}`},
      { name: `note: ${part.genbank.note}`},
      { name: `product: ${part.genbank.product}`},
      { name: `protein_id: ${part.genbank.protein_id}`},
      { name: `translation: ${part.genbank.translation}`}
    ]
  });
  part.barcode && partObj.children.push({ name: `Barcode: ${part.barcode}`});
  part.translation && partObj.children.push({ name: `Translation: ${part.translation}`});
  part.vbd && partObj.children.push({ name: `VBD: ${part.vbd}`});
  part.vector && partObj.children.push({ name: `Vector: ${part.vector}`});
  part.tags && partObj.children.push({ name: `Tags: ${part.tags}`});
  return partObj;  
}

const Tree = { sortObjArrByAttr, convertCollection, convertSubCollection, convertPart };

export default Tree;