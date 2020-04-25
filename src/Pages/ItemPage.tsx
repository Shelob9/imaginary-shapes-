import React from "react";
import { UserSession } from "blockstack";
import useBlockStackSavedItems from "../useBlockStackSavedItems";
import { useParams } from "react-router-dom";
import { Edit } from "../TodoItem/Edit";
import { ItemsContext } from "../ItemsContext";
import { SavedItem } from "../sorter/types";

const LoadingIndicator = (props: { isLoading: boolean }) =>
	props.isLoading ? <div>Loading Spinner</div> : null;
const SavingIndicator = (props: { isSaving: boolean }) =>
	props.isSaving ? <div>Saving Spinner</div> : null;

export default function ItemPage() {
	const {
		activeItemId,
		saveItem,
		setActiveItemId,
		getItemById,
		isLoading,
		isSaving,
		items,
	} = React.useContext(ItemsContext);
	let { id } = useParams();

	//Set active item ID from URL
	React.useEffect(() => {
		setActiveItemId(id);
	}, [id]);

	//Get the active item
	const initialItem = React.useMemo(() => {
		return getItemById(activeItemId);
	}, [activeItemId, items]);

	return React.useMemo(
		() => (
			<React.Fragment>
				<LoadingIndicator isLoading={isLoading} />
				<SavingIndicator isSaving={isSaving} />
				{initialItem ? (
					<React.Fragment>
						<Edit
							onSave={saveItem}
							titleText={`Edit ${initialItem.title}`}
							initialItem={initialItem}
							submitText={"Update"}
							activeItemId={activeItemId}
						/>
					</React.Fragment>
				) : (
					<div>Not Found</div>
				)}
			</React.Fragment>
		),
		[activeItemId, items]
	);
}