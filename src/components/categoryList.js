import * as React from "react"
import { useContext } from "react"
import { View, StyleSheet } from "react-native"
import { IconButton, List, Text } from "react-native-paper"
import {
  deleteCategory,
  getCategories
} from "../../src/repository/categoryRepository"
import AppContext from "../../src/services/appContext"

const CategoryList = ({ category, navigation }) => {
  const { setCategories, setCategoryEdit } = useContext(AppContext)

  async function funcDeleteCategory() {
    await deleteCategory(category.id || 0)
    let categories = await getCategories()

    setCategories(categories)
  }

  async function funcEditCategory() {
    setCategoryEdit(category)
    navigation.navigate("CreateCategoryScreen")
  }

  return (
    <View>
      <List.Item
        title={() => (
          <Text
            style={
              category.is_deleted
                ? {
                    textDecorationLine: "line-through",
                    textDecorationStyle: "solid",
                    color: "#bdc3c7"
                  }
                : {}
            }
          >
            {category.description}
          </Text>
        )}
        left={props => <List.Icon {...props} icon="format-list-bulleted" />}
        right={_ => (
          <View style={styles.buttonView}>
            <IconButton
              icon="pencil"
              size={20}
              disabled={category.is_deleted}
              onPress={() => funcEditCategory()}
            />
            <IconButton
              icon="delete"
              color="#e74c3c"
              disabled={category.is_deleted}
              size={20}
              onPress={() => funcDeleteCategory()}
            />
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    buttonView: {
        flexDirection: 'row'
    }
});

export default CategoryList
