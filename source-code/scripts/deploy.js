const hre = require('hardhat');

async function deploy(){
    const Salamun = await hre.ethers.getContractFactory('Salamun');
    const salamun = await Salamun.deploy();

    await salamun.deployed();

    const SalamunZombie = await hre.ethers.getContractFactory('SalamunZombie');
    const salamunZombie = await SalamunZombie.deploy(salamun.address);

    await salamunZombie.deployed();

    console.log("Salamun deployed to:", salamun.address);
    console.log("Salamun Zombie deployed to:", salamunZombie.address);
}

deploy()
    .then(() =>process.exit(0))
    .catch((error) =>{
        console.log(error)
        process.exit(1);
    });