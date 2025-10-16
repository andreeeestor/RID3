import CustomButton from "./CustomButton";

export default function Payment(){

    const openPaymentSheet = async () => {}

    return(
        <>
        <CustomButton 
            title="Confirmar Corrida"
            className="my-10"
            onPress={openPaymentSheet}
        />
        </>
    )
}